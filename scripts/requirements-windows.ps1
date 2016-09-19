# Please ensure executionpolicy is set correctly:
# Set-ExecutionPolicy RemoteSigned

#
# Check if chocolatey is installed
#
if(Test-Path "C:\ProgramData\chocolatey"){
	"Chocolatey gevonden op systeem! Yay!"
}else{
	iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

	$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
}

#
# Check if python is installed
#
$p = &{python -V} 2>&1
# check if an ErrorRecord was returned
$version = if($p -is [System.Management.Automation.ErrorRecord])
{
    # grab the version string from the error message
    "Python 2 niet gevonden."
	choco install python2 -Y
}
else{
	"Python is already installed"
}

#
# Check if nodejs is installed
#
try{
	$nodeVersion = &{node -v}
}catch{
	choco install nodejs -Y
	$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
}

#
# Check if postgresql is installed
#
try{
	psql --help | Out-Null
	"Postgresql already installed"
}catch{
	choco install postgresql -Y
}

#
# Temporary bugfix for bcrypt rebuild with c++ ...
#
npm install -g npm

#
# Check if Gulp is installed
#
npm install -g gulp

#
# Check if Typescript is installed
#
npm install -g typescript@next

#
# Check if Typings is installed
#
npm install -g typings

#
# Check if db-migrate is installed
#
npm install -g db-migrate db-migrate-pg