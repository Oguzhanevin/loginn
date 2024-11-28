// cypress/integration/login.spec.js

describe('Login Formu Testi', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:5173'); // Projenizin çalıştığı URL'yi buraya yazın
    });
  
    it('Geçerli bilgilerle giriş yapabilmeliyim', () => {
      // E-posta, şifre ve onay kutusunu doğru şekilde doldurup, giriş yapma testi.
      cy.get('input[name="email"]').type('validemail@example.com');
      cy.get('input[name="password"]').type('strongpassword123');
      cy.get('input[name="terms"]').check(); // Şartlar kutusunu işaretle
  
      // Giriş butonunun aktif olduğunu kontrol et
      cy.get('button').should('not.be.disabled');
      
      // Giriş yaptıktan sonra başarı sayfasına yönlendirilme
      cy.get('button').click();
      cy.url().should('include', '/success');  // Eğer login başarılıysa, success sayfasına gitmeli
    });
  
    it('Hatalı bilgilerle giriş yapmaya çalıştığımda hata mesajı görmeliyim', () => {
      // Hatalı e-posta ve şifre girme testi
      cy.get('input[name="email"]').type('invalidemail@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('input[name="terms"]').check();
  
      // Giriş butonunun aktif olmadığını kontrol et
      cy.get('button').should('be.disabled');
  
      // Hata mesajlarının görüntülenmesini kontrol et
      cy.get('.error-message').should('contain', 'Invalid email or password');
    });
  
  });
  