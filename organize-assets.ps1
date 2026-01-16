# Script para organizar assets para o Vercel

# Criar estrutura de pastas
$folders = @(
    "public/assets/logos",
    "public/assets/team",
    "public/assets/clients",
    "public/assets/portfolio",
    "public/assets/before-after",
    "public/assets/feedbacks"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "Pastas criadas!" -ForegroundColor Green

# Copiar logo horizontal
Copy-Item -Path "recursos/NOSSA LOGO/MÉTRICA - LOGO HORIZONTAL_1.png" -Destination "public/assets/logos/logo-horizontal.png" -Force
Write-Host "✓ Logo copiada" -ForegroundColor Green

# Copiar foto da equipe
Copy-Item -Path "recursos/RESPONSAVEIS PELA MÉTRICA/FOTO- PESSOAS A FRENTE DA MÉTRICA.png" -Destination "public/assets/team/team.png" -Force
Write-Host "✓ Foto da equipe copiada" -ForegroundColor Green

# Copiar logos de clientes
Get-ChildItem "recursos/Empresas que ja confiaram no nosso trabalho/*.png" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination "public/assets/clients/" -Force
}
Write-Host "✓ Logos de clientes copiados" -ForegroundColor Green

# Copiar antes e depois
Get-ChildItem "recursos/PERFIS ANTES E DEPOIS/*.jpeg" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination "public/assets/before-after/" -Force
}
Write-Host "✓ Antes e depois copiados" -ForegroundColor Green

# Copiar feedbacks
Copy-Item -Path "recursos/FEEDBACKS/FEEDBACK CLINICA ODONTOLOGICA.jpeg" -Destination "public/assets/feedbacks/feedback-odontologica.jpeg" -Force
Copy-Item -Path "recursos/FEEDBACKS/Veiculo vendido com investimento de R$13,28.jpg" -Destination "public/assets/feedbacks/venda-veiculo.jpg" -Force
Copy-Item -Path "recursos/FEEDBACKS/FEEDBACK-TRAFEGO PAGO GARAGEM DE VEICULO.jpeg" -Destination "public/assets/feedbacks/feedback-garagem.jpeg" -Force
Write-Host "✓ Feedbacks copiados" -ForegroundColor Green

# Copiar portfolio
Copy-Item -Path "recursos/ARTES/ACM/07-10-25 - ACM - CUIDAR DAS PESSOAS.jpg" -Destination "public/assets/portfolio/" -Force
Copy-Item -Path "recursos/ARTES/ACM/25-09-25 - ACM - PLANEJAMENTO.png" -Destination "public/assets/portfolio/art-1.png" -Force
Copy-Item -Path "recursos/LOGOS FEITAS/EASYFIT - APRESENTAÇÃO LOGO 2.png" -Destination "public/assets/portfolio/" -Force
Copy-Item -Path "recursos/LOGOS FEITAS/CASA DO MACARRÃO - APRESENTAÇÃO LOGO 2.png" -Destination "public/assets/portfolio/" -Force
Copy-Item -Path "recursos/LOGOS FEITAS/WhatsApp Image 2026-01-15 at 18.00.47.jpeg" -Destination "public/assets/portfolio/" -Force
Write-Host "✓ Portfolio copiado" -ForegroundColor Green

Write-Host "`n✅ Todos os assets foram organizados com sucesso!" -ForegroundColor Cyan
Write-Host "Agora você pode fazer o deploy para o Vercel." -ForegroundColor Yellow
