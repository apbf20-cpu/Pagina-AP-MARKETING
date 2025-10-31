# 🚀 INSTRUÇÕES PARA PUBLICAR VIA FTP

## 📋 O que você precisa fazer

### **PASSO 1: Preparar os Arquivos** ✅

Você já tem tudo pronto nesta pasta! Os arquivos são:

```
✅ index.html                                    (página principal)
✅ styles.css                                    (estilos)
✅ script.js                                     (funcionalidades - WhatsApp já configurado!)
✅ Modelo_de_logotipo_1-removebg-preview.png    (logo)
```

---

### **PASSO 2: Acessar o FTP**

#### **Opção A - Usando FileZilla (Recomendado)**

1. **Baixe o FileZilla:**
   - Acesse: https://filezilla-project.org/
   - Baixe e instale o **FileZilla Client**

2. **Conecte ao seu servidor:**
   - Abra o FileZilla
   - Preencha no topo da janela:
     - **Host:** ftp.apmarketingpro.com (ou o fornecido pelo seu hosting)
     - **Usuário:** seu_usuario_ftp
     - **Senha:** sua_senha_ftp
     - **Porta:** 21
   - Clique em **"Conexão Rápida"**

3. **Onde encontrar suas credenciais FTP:**
   - No painel do seu **hosting** (Hostinger, Hostgator, etc)
   - Procure por "FTP" ou "Gerenciador de Arquivos"
   - Geralmente em: Contas FTP > Criar/Ver Conta

#### **Opção B - Pelo Painel do Hosting**

1. Acesse o **cPanel** ou painel do seu hosting
2. Procure por **"Gerenciador de Arquivos"**
3. Clique para abrir

---

### **PASSO 3: Criar a Pasta da Landing Page**

1. **Navegue até a pasta raiz:**
   - No lado direito do FileZilla (ou no Gerenciador de Arquivos)
   - Entre na pasta: `public_html/`

2. **Crie uma nova pasta:**
   - Botão direito > **"Criar pasta"**
   - Nome sugerido: `landing` (pode ser outro nome)
   - Confirme

3. **Entre na nova pasta:**
   - Dê duplo clique na pasta `landing/`

---

### **PASSO 4: Fazer Upload dos Arquivos**

#### **No FileZilla:**

1. **No lado ESQUERDO** (seu computador):
   - Navegue até: `C:\Users\Paulinha\Documents\LPAPMARKETING\`

2. **Selecione os 4 arquivos:**
   - `index.html`
   - `styles.css`
   - `script.js`
   - `Modelo_de_logotipo_1-removebg-preview.png`

3. **Arraste para o lado DIREITO** (servidor)
   - Ou: Botão direito > **"Upload"**

4. **Aguarde o upload completar**
   - Você verá uma barra de progresso
   - Quando terminar, todos os arquivos estarão no servidor

#### **No Gerenciador de Arquivos:**

1. Clique em **"Upload"** ou **"Enviar Arquivos"**
2. Selecione os 4 arquivos
3. Clique em **"Abrir"** ou **"Enviar"**
4. Aguarde o upload

---

### **PASSO 5: Acessar Sua Landing Page** 🎉

Sua landing page estará disponível em:

```
https://apmarketingpro.com/landing/
```

Ou, se você criou com outro nome:

```
https://apmarketingpro.com/[nome-da-pasta]/
```

---

## ✅ CHECKLIST PÓS-PUBLICAÇÃO

Após publicar, teste:

```
✅ A página está carregando?
✅ O logo está aparecendo?
✅ As cores estão corretas?
✅ O formulário funciona?
✅ Ao enviar, abre o WhatsApp com a mensagem?
✅ Os links de Instagram e Facebook funcionam?
✅ Testar no celular (abra pelo smartphone)
```

---

## 🔧 PROBLEMAS COMUNS E SOLUÇÕES

### **Problema 1: Página não carrega (erro 404)**
**Solução:**
- Verifique se criou a pasta dentro de `public_html/`
- Confirme que o arquivo `index.html` está dentro da pasta
- Aguarde 5 minutos (cache do servidor)

### **Problema 2: Logo não aparece**
**Solução:**
- Verifique se o arquivo `Modelo_de_logotipo_1-removebg-preview.png` foi enviado
- Confirme que está na mesma pasta que o `index.html`

### **Problema 3: Formulário não funciona**
**Solução:**
- Verifique se o arquivo `script.js` foi enviado
- Teste abrindo o Console do navegador (F12) e veja se há erros

### **Problema 4: WhatsApp não abre com a mensagem**
**Solução:**
- O número já está configurado: (11) 99706-9878
- Teste no celular (funciona melhor que no desktop)

---

## 🎯 ESTRUTURA FINAL NO SERVIDOR

Deve ficar assim:

```
public_html/
  └── landing/
      ├── index.html
      ├── styles.css
      ├── script.js
      └── Modelo_de_logotipo_1-removebg-preview.png
```

---

## 🚀 DICAS EXTRAS

### **1. Domínio Personalizado**

Se quiser que a landing page fique em: `https://landing.apmarketingpro.com`

1. No cPanel, vá em **"Subdomínios"**
2. Crie: `landing.apmarketingpro.com`
3. Aponte para a pasta: `public_html/landing/`

### **2. Atualizar a Página Depois**

Para fazer mudanças:
1. Edite os arquivos no seu computador
2. Reconecte via FTP
3. Sobrescreva os arquivos antigos
4. Limpe o cache do navegador (Ctrl+F5)

### **3. SSL/HTTPS**

Se o site abrir com aviso de "não seguro":
1. No cPanel, procure por **"SSL/TLS"**
2. Ative o certificado gratuito **Let's Encrypt**
3. Aguarde até 24h para ativar

---

## 📞 SUPORTE

**Precisa de ajuda?**

- WhatsApp: (11) 99706-9878
- Suporte do Hosting: Acesse o painel do seu provedor

---

## 🎉 PRONTO!

Sua landing page está pronta para receber visitas e converter leads!

**URL Final:** https://apmarketingpro.com/landing/

---

**Desenvolvido com ♟️ seguindo o Método Xadrez de planejamento estratégico.**
**© 2025 AP Marketing Digital**