const iconsBlock = document.getElementById('header-icons-block'),
    loginBlockBtn = document.getElementById('login-block-btn'),
    loginBlock = document.getElementById('login-block'),
    registrationBlockBtn = document.getElementById('registration-block-btn'),
    registrationBlock = document.getElementById('registration-block'),
    forgotPasswordBtn = document.getElementById('forgot-password-btn'),
    accesRecoveryBlock = document.getElementById('access-recovery-block'),
    informerSuccess = document.getElementById('informer-success'),
    accesRecoveryBtn = document.getElementById('access-recovery-btn');

iconsBlock.hidden = true;

loginBlockBtn.addEventListener('click', () => {
    loginBlock.hidden = false;
    registrationBlock.hidden = true;
    accesRecoveryBlock.hidden = true;
});
registrationBlockBtn.addEventListener('click', () => {
    registrationBlock.hidden = false;
    loginBlock.hidden = true;
    accesRecoveryBlock.hidden = true;
});
forgotPasswordBtn.addEventListener('click', () => {
    accesRecoveryBlock.hidden = false;
    loginBlock.hidden = true;
    registrationBlock.hidden = true;
});
accesRecoveryBtn.addEventListener('click', e => {
    e.stopPropagation();
    const iconsWrapper = document.getElementById('informer-icon');
    const informerText = document.getElementById('informer-text');

    console.log(iconsWrapper);
    iconsWrapper.style.display = 'none';
    accesRecoveryBtn.disabled = true;
    informerSuccess.hidden = false;
    informerText.innerText =
        'Проверьте указанный Email, мы отправили вам письмо с инструкцией по восстановлению доступа';
});
