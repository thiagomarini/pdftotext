require 'rack'
require 'xpdf'

VALID_METHODS = ['POST', 'PUT']
VALID_ACCEPTS = [nil, '*/*', 'text/plain']
VALID_CONTENT_TYPES = [nil, 'application/pdf']

def pdftotext(env)
  req = Rack::Request.new(env)

  if env['REQUEST_METHOD'] == 'OPTIONS'
    return [204, {
      'Access-Control-Allow-Origin' => "*",
      'Access-Control-Allow-Methods' => "POST, PUT, OPTIONS",
      'Access-Control-Request-Headers' => "Content-Type"
    }, []]
  elsif !VALID_METHODS.include?(env['REQUEST_METHOD'])
    return [405, {}, []]
  end

  unless VALID_ACCEPTS.include?(env['HTTP_ACCEPT'])
    return [406, {}, []]
  end

  unless VALID_CONTENT_TYPES.include?(env['CONTENT_TYPE'])
    return [415, {}, []]
  end

  pdf  = Tempfile.new(['pdftotext', '.pdf'])
  text = Tempfile.new(['pdftotext', '.txt'])

  pdf.write(req.body.read)

  command = [Xpdf::PDFTOTEXT]

  params = req.GET
  command += ["-f", "#{params['f'].to_i}"] if params['f']
  command += ["-l", "#{params['l'].to_i}"] if params['l']
  command += ["-layout"] if params['layout']
  command += ["-table"] if params['table']
  command += ["-lineprinter"] if params['lineprinter']
  command += ["-raw"] if params['raw']
  command += ["-fixed", "#{params['fixed'].to_i}"] if params['fixed']
  command += ["-linespacing", "#{params['linespacing'].to_i}"] if params['linespacing']
  command += ["-clip"] if params['clip']
  command += ["-nopgbrk"] if params['nopgbrk']
  command += ["-opw", "#{params['opw']}"] if params['opw']
  command += ["-upw", "#{params['upw']}"] if params['upw']
  command += ["-q", pdf.path, text.path]

  system(*command)

  body = text.read.encode(Encoding::US_ASCII, universal_newline: true,
    invalid: :replace, undef: :replace, replace: "")

  [200, {
    'Access-Control-Allow-Methods' => "POST,PUT",
    'Access-Control-Allow-Origin' => "*",
    'Content-Type' => "text/plain"
  }, [body]]
ensure
  pdf.close if pdf
  text.close if text
end

run method(:pdftotext)
