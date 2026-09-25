import { Component } from '@angular/core';

@Component({
  selector: 'app-politica-privacidade',
  standalone: true,
  template: `
    <article class="policy">
      <span>PRIVACIDADE</span>
      <h1>Política de Privacidade</h1>
      <p class="lead">Esta página apresenta, de forma simplificada, como o protótipo acadêmico trata informações de usuários.</p>

      <h2>1. Quais dados são utilizados?</h2>
      <p>No cadastro, o protótipo solicita nome, e-mail, tipo de conta e senha. Esses dados ficam armazenados localmente no navegador para simular uma aplicação com autenticação.</p>

      <h2>2. Para que os dados são usados?</h2>
      <p>Os dados são utilizados exclusivamente para demonstrar criação de conta, login, sessão e personalização do painel.</p>

      <h2>3. Cookies e armazenamento local</h2>
      <p>O projeto utiliza armazenamento local do navegador para manter a sessão de demonstração e a preferência relacionada ao aviso de privacidade. Não há integração com servidores externos neste protótipo.</p>

      <h2>4. Consentimento</h2>
      <p>O cadastro exige que o usuário declare que leu e concorda com esta política. O banner de privacidade informa sobre o uso de armazenamento local.</p>

      <h2>5. Projeto acadêmico</h2>
      <p>Este sistema é um protótipo desenvolvido para um TCC Front-End. Em uma versão de produção, seriam necessários backend seguro, gestão formal de consentimento, controles de acesso, políticas de retenção e revisão jurídica adequada à LGPD.</p>
      <h2>6. Como limpar seus dados</h2>
      <p>
        Como as informações são salvas exclusivamente no navegador, você pode apagar todos os dados armazenados a qualquer momento limpando os dados de navegação/Cache do seu navegador ou utilizando a opção de "Sair" da aplicação.
      </p>
    </article>
  `,
  styles: [`
    .policy{max-width:850px;margin:auto;padding:80px 25px 100px}.policy>span{font-size:11px;font-weight:800;letter-spacing:.14em;color:#2e8247}.policy h1{font:700 clamp(42px,6vw,64px) 'Space Grotesk';margin:15px 0 20px}.policy h2{font:700 24px 'Space Grotesk';margin-top:38px}.policy p{color:#626e66;line-height:1.8}.policy .lead{font-size:18px}
  `]
})
export class PoliticaPrivacidadeComponent {}
