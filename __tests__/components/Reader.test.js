'use strict';

const Reader = require('../../components/reader');
const event = require('./sample-event');
const PdfToText = require('../../pdfToTextCaller');
const Responses = require('../../responses');

describe('Reader component', () => {
  test("PDFs can be read", async () => {
    const callback = jest.fn();

    await Reader.read(event, callback, PdfToText);

    expect(callback).toBeCalledWith(null, Responses.success({
      text: "GIT CHEAT SHEET                                                                                                                         V 1.1.1\n\n\n\n\nGit is the open source distributed version control system that facilitates GitHub activities on your laptop or\ndesktop. This cheat sheet summarizes commonly used Git command line instructions for quick reference.\n\n\n\n\nINSTALL GIT                                                          MAKE CHANGES\nGitHub provides desktop clients that include a graphical user        Review edits and craft a commit transaction\ninterface for the most common repository actions and an automati-\ncally updating command line edition of Git for advanced scenarios.    $ git status\n\nGitHub for Windows                                                    Lists all new or modified files to be committed\nhttps://windows.github.com\n                                                                      $ git diff\nGitHub for Mac                                                        Shows file diﬀerences not yet staged\nhttps://mac.github.com\n                                                                      $ git add [file]\n\nGit distributions for Linux and POSIX systems are available on the    Snapshots the file in preparation for versioning\noﬃcial Git SCM web site.                                              $ git diff --staged\n\nGit for All Platforms                                                 Shows file diﬀerences between staging and the last file version\nhttp://git-scm.com\n                                                                      $ git reset [file]\n\n                                                                      Unstages the file, but preserve its contents\n\nCONFIGURE TOOLING                                                     $ git commit -m \"[descriptive message]\"\nConfigure user information for all local repositories\n                                                                      Records file snapshots permanently in version history\n\n $ git config --global user.name \"[name]\"\n\n Sets the name you want attached to your commit transactions\n $ git config --global user.email \"[email address]\"\n                                                                     GROUP CHANGES\n                                                                     Name a series of commits and combine completed eﬀorts\n Sets the email you want attached to your commit transactions\n                                                                      $ git branch\n $ git config --global color.ui auto\n                                                                      Lists all local branches in the current repository\n Enables helpful colorization of command line output\n                                                                      $ git branch [branch-name]\n\n                                                                      Creates a new branch\n\nCREATE REPOSITORIES                                                   $ git checkout [branch-name]\nStart a new repository or obtain one from an existing URL\n                                                                      Switches to the specified branch and updates the working directory\n $ git init [project-name]                                            $ git merge [branch]\n\n Creates a new local repository with the specified name               Combines the specified branch’s history into the current branch\n $ git clone [url]                                                    $ git branch -d [branch-name]\n\n Downloads a project and its entire version history                   Deletes the specified branch\n\f          GIT CHEAT SHEET\n\n\nREFACTOR FILENAMES                                                      REVIEW HISTORY\nRelocate and remove versioned files                                     Browse and inspect the evolution of project files\n\n $ git rm [file]                                                         $ git log\n\n Deletes the file from the working directory and stages the deletion     Lists version history for the current branch\n\n $ git rm --cached [file]                                                $ git log --follow [file]\n\n Removes the file from version control but preserves the file locally    Lists version history for a file, including renames\n\n $ git mv [file-original] [file-renamed]                                 $ git diff [first-branch]...[second-branch]\n\n Changes the file name and prepares it for commit                        Shows content diﬀerences between two branches\n                                                                         $ git show [commit]\n\n                                                                         Outputs metadata and content changes of the specified commit\nSUPPRESS TRACKING\nExclude temporary files and paths\n\n *.log\n                                                                        REDO COMMITS\n build/                                                                 Erase mistakes and craft replacement history\n temp-*\n                                                                         $ git reset [commit]\n A text file named .gitignore suppresses accidental versioning of\n files and paths matching the specified patterns                         Undoes all commits after [commit], preserving changes locally\n\n $ git ls-files --other --ignored --exclude-standard                     $ git reset --hard [commit]\n\n Lists all ignored files in this project                                 Discards all history and changes back to the specified commit\n\n\n\nSAVE FRAGMENTS                                                          SYNCHRONIZE CHANGES\nShelve and restore incomplete changes                                   Register a repository bookmark and exchange version history\n\n $ git stash                                                             $ git fetch [bookmark]\n\n Temporarily stores all modified tracked files                           Downloads all history from the repository bookmark\n $ git stash pop                                                         $ git merge [bookmark]/[branch]\n\n Restores the most recently stashed files                                Combines bookmark’s branch into current local branch\n $ git stash list                                                        $ git push [alias] [branch]\n\n Lists all stashed changesets                                            Uploads all local branch commits to GitHub\n $ git stash drop                                                        $ git pull\n\n Discards the most recently stashed changeset                            Downloads bookmark history and incorporates changes\n\n\n\n\n Learn more about using GitHub and Git. Email the Training Team or visit                                         training@github.com\n our web site for learning event schedules and private class availability.                                       training.github.com\n\f"
    }));
  });
});