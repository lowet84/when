$rethinkDbVersion="2.3.6"

New-Item -ItemType Directory -Force -Path rethinkdb
if (!(Test-Path rethinkdb\rethinkdb.exe)) 
{ 
    $proxy = [System.Net.WebRequest]::GetSystemWebproxy()
    $proxy.Credentials = [System.Net.CredentialCache]::DefaultCredentials
    
    $WS.Proxy = $proxy
    Invoke-WebRequest -Uri https://download.rethinkdb.com/windows/rethinkdb-$rethinkDbVersion.zip -OutFile rethinkdb\rethinkdb.zip -SessionVariable WS
    .\tools\7za.exe x -orethinkdb .\rethinkdb\rethinkdb.zip
    Remove-Item rethinkdb\rethinkdb.zip
    Move-Item rethinkdb\rethinkdb-$rethinkDbVersion\rethinkdb.exe rethinkdb\rethinkdb.exe
}

$location = Get-Location
$rethinkDbJob = {
  Set-Location rethinkdb
  ./rethinkdb.exe
}
$apiJob = {
  Set-Location when.ApiServer
  dotnet restore
  dotnet watch run
}
$webJob = {
  Set-Location when.Web
  npm install
  npm run dev
}

Invoke-Expression "cmd /c start powershell -Command { $rethinkDbJob }"
Invoke-Expression "cmd /c start powershell -Command { $apiJob }"
Invoke-Expression "cmd /c start powershell -Command { $webJob }"