# git workflow
## branching
Always create a local branch, dont push directly to the master. After your work is done, create a pull request on github. 

In order to merge the pull request into main branch:

- all tests must succeed 
- newly added code must be covered by tests

## commit messages
When committing, follow the following rules:

- add many small commits on the branch
- adding a package to package.json *must* be in a separate commit message
- reference issues when possible using #

Describe the commit forming a sentence like 'this commit ...', e.g.

- adds a new new table 'tblCustomers'
- fixes #33
- adds new dependency for gulp-build
- improves gulp task 'xxx'

Do **not** use capital letters or punctuation at the end of the message.

## git tips and tricks
### fuck, I didnt want to commit that
In this scenario, beware of trying to use an IDE to solve this. Best turn to the command line! 

In order to undo the last 2 commits on this local branch:

    git reset HEAD~2

If you already pushed to the remote branch, you will need to override it the hard way. After fixing the local commits:

    git push --force
 
### undo commit and throw away changes
If you want a clean reset to the same version of the remote:

    git reset --hard origin/master
