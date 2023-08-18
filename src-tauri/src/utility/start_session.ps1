# start_session.ps1
$session = New-PSSession -ComputerName localhost
Enter-PSSession $session
