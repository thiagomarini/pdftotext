require 'rack'
require 'xpdf'

def pdftotext(env)
  req = Rack::Request.new(env)

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

  [200, {
    'Access-Control-Allow-Origin' => "*",
    'Content-Type' => "text/plain"
  }, [text.read]]
ensure
  pdf.close if pdf
  text.close if text
end

run method(:pdftotext)
