Get-ChildItem 'D:\Dataset Bosung Thien\train\Cattle\Label\*.txt' -Recurse | ForEach {
(Get-Content $_ | ForEach { $_ -replace '0 ', 'Cattle ' }) |
Set-Content $_
}