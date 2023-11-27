
const verificaSenha = () => {
    const entrada = document.getElementById("campo-senha").value;
    const senha = '81dc9bdb52d04dc20036dbd8313ed055';

    if (hex_md5(entrada) === senha){
        localStorage.setItem('coiso', 'qualquer valor');
        window.location = 'home.html'; 
    } else {
        alert('Senha incorreta!');
    }
}

