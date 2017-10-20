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

Remove-Job -Force when.RethinkDb
Remove-Job -Force when.ApiServer
Remove-Job -Force when.Web
$location = Get-Location
$rethinkDbJob = {
  Set-Location $args[0]
  Set-Location rethinkdb
  ./rethinkdb.exe
}
$apiJob = {
  Set-Location $args[0]
  Set-Location when.ApiServer
  dotnet restore
  dotnet watch run
}
$webJob = {
  Set-Location $args[0]
  Set-Location when.Web
  npm install
  npm run dev
}

Start-Job -name when.RethinkDb -ArgumentList $location -ScriptBlock $rethinkDbJob
Start-Job -name when.ApiServer -ArgumentList $location -ScriptBlock $apiJob
Start-Job -name when.Web -ArgumentList $location -ScriptBlock $webJob

Write-Host "Press any key to exit ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Write-Host "Killing processes ..."
Remove-Job -Force when.RethinkDb
Remove-Job -Force when.ApiServer
Remove-Job -Force when.Web
Exit-PSSession