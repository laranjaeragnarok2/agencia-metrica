import os
import shutil
from pathlib import Path

# Diretório base
base = Path(".")
recursos = base / "recursos"
public_assets = base / "public" / "assets"

# Criar estrutura de pastas
folders = [
    "logos",
    "team",
    "clients",
    "portfolio",
    "before-after",
    "feedbacks"
]

print("🔧 Criando estrutura de pastas...")
for folder in folders:
    (public_assets / folder).mkdir(parents=True, exist_ok=True)
print("✓ Pastas criadas!\n")

# Mapeamento de origem -> destino
files_to_copy = [
    # Logo
    (recursos / "NOSSA LOGO" / "MÉTRICA - LOGO HORIZONTAL_1.png", 
     public_assets / "logos" / "logo-horizontal.png"),
    
    # Equipe
    (recursos / "RESPONSAVEIS PELA MÉTRICA" / "FOTO- PESSOAS A FRENTE DA MÉTRICA.png",
     public_assets / "team" / "team.png"),
    
    # Feedbacks
    (recursos / "FEEDBACKS" / "FEEDBACK CLINICA ODONTOLOGICA.jpeg",
     public_assets / "feedbacks" / "feedback-odontologica.jpeg"),
    (recursos / "FEEDBACKS" / "Veiculo vendido com investimento de R$13,28.jpg",
     public_assets / "feedbacks" / "venda-veiculo.jpg"),
    (recursos / "FEEDBACKS" / "FEEDBACK-TRAFEGO PAGO GARAGEM DE VEICULO.jpeg",
     public_assets / "feedbacks" / "feedback-garagem.jpeg"),
    
    # Portfolio
    (recursos / "ARTES" / "ACM" / "07-10-25 - ACM - CUIDAR DAS PESSOAS.jpg",
     public_assets / "portfolio" / "07-10-25 - ACM - CUIDAR DAS PESSOAS.jpg"),
    (recursos / "ARTES" / "ACM" / "25-09-25 - ACM - PLANEJAMENTO.png",
     public_assets / "portfolio" / "art-1.png"),
    (recursos / "LOGOS FEITAS" / "EASYFIT - APRESENTAÇÃO LOGO 2.png",
     public_assets / "portfolio" / "EASYFIT - APRESENTAÇÃO LOGO 2.png"),
    (recursos / "LOGOS FEITAS" / "CASA DO MACARRÃO - APRESENTAÇÃO LOGO 2.png",
     public_assets / "portfolio" / "CASA DO MACARRÃO - APRESENTAÇÃO LOGO 2.png"),
    (recursos / "LOGOS FEITAS" / "WhatsApp Image 2026-01-15 at 18.00.47.jpeg",
     public_assets / "portfolio" / "WhatsApp Image 2026-01-15 at 18.00.47.jpeg"),
]

# Copiar arquivos individuais
print("📋 Copiando arquivos individuais...")
for src, dst in files_to_copy:
    if src.exists():
        shutil.copy2(src, dst)
        print(f"  ✓ {dst.name}")
    else:
        print(f"  ⚠ Não encontrado: {src}")

# Copiar todos os logos de clientes
print("\n👥 Copiando logos de clientes...")
clients_dir = recursos / "Empresas que ja confiaram no nosso trabalho"
if clients_dir.exists():
    for img in clients_dir.glob("*.png"):
        dst = public_assets / "clients" / img.name
        shutil.copy2(img, dst)
        print(f"  ✓ {img.name}")

# Copiar antes e depois
print("\n🔄 Copiando antes e depois...")
before_after_dir = recursos / "PERFIS ANTES E DEPOIS"
if before_after_dir.exists():
    for img in before_after_dir.glob("*.jpeg"):
        dst = public_assets / "before-after" / img.name
        shutil.copy2(img, dst)
        print(f"  ✓ {img.name}")

print("\n✅ Todos os assets foram organizados com sucesso!")
print("🚀 Agora você pode fazer o deploy para o Vercel.")
