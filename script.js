// Mensajes cifrados para cada nivel
const challenges = {
    nivel1: {
        message: "KHOOR ZRUOG",
        hint: "El mensaje está cifrado con un desplazamiento fijo",
        flag: "FLAG{HELLO_WORLD}"
    },
    nivel2: {
        message: "XLI GSQIW XS FIWX",
        hint: "Analiza la frecuencia de las letras",
        flag: "FLAG{THE_FLAG_IS_HERE}"
    },
    nivel3: {
        message: "XMKQ ZQKX",
        hint: "La clave es una palabra corta",
        flag: "FLAG{FLAG_FOUND}"
    },
    nivel4: {
        message: "QJKESQTPQJKESQTPQJKESQTP",
        hint: "Busca secuencias repetidas de 4 letras",
        flag: "FLAG{REPEATED_PATTERN}"
    },
    nivel5: {
        message: "72 89 76 65 71",
        hint: "Usa los números primos p=11 y q=13",
        flag: "FLAG{RSA_FLAG}"
    },
    nivel6: {
        message: "n = 323",
        hint: "Factoriza el número n",
        flag: "FLAG{FACTORED}"
    },
    nivel7: {
        message: "48656c6c6f20576f726c64",
        hint: "La clave es una secuencia numérica",
        flag: "FLAG{AES_FLAG}"
    },
    nivel8: {
        message: "FLAG{hash_me}",
        hint: "Genera un hash del mensaje",
        flag: "FLAG{7d793037a0760186574b0282f2fdc4}"
    },
    nivel9: {
        message: "01001000 01101001",
        hint: "Sigue los pasos del protocolo BB84",
        flag: "FLAG{QUANTUM_FLAG}"
    },
    nivel10: {
        message: "U2FsdGVkX1+8m6v3x7j9",
        hint: "Combina múltiples técnicas de cifrado",
        flag: "FLAG{FINAL_FLAG}"
    }
};

// Estado del juego
let gameState = {
    foundFlags: new Set(),
    currentLevel: 'nivel1'
};

// Función para validar flags
function validateFlag(level) {
    const input = document.getElementById(`flag-input-${level.slice(-1)}`);
    const userFlag = input.value.trim();
    const correctFlag = challenges[level].flag;

    if (userFlag === correctFlag) {
        if (!gameState.foundFlags.has(level)) {
            gameState.foundFlags.add(level);
            updateScore();
            showSuccess(`¡Flag encontrada! +1 punto`);
        }
    } else {
        showError("Flag incorrecta. Intenta de nuevo.");
    }
}

// Función para actualizar el puntaje
function updateScore() {
    const scoreElement = document.getElementById('flags-found');
    scoreElement.textContent = gameState.foundFlags.size;
}

// Función para mostrar mensaje de éxito
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Función para mostrar mensaje de error
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Función para cambiar de nivel
function changeLevel(level) {
    gameState.currentLevel = level;
    document.querySelectorAll('.exercise-card').forEach(card => {
        card.style.display = 'none';
    });
    document.querySelector(`.exercise-card[data-difficulty="${level}"]`).style.display = 'block';
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.difficulty-btn[data-difficulty="${level}"]`).classList.add('active');
}

// Función para cifrar con César
function cipherCaesar() {
    const text = document.getElementById('caesar-input').value.toUpperCase();
    const shift = parseInt(document.getElementById('caesar-shift').value);
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
            const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
            result += String.fromCharCode(code);
        } else {
            result += char;
        }
    }

    document.getElementById('caesar-result').textContent = result;
}

// Función para descifrar con César
function decipherCaesar() {
    const text = document.getElementById('caesar-input').value.toUpperCase();
    const shift = parseInt(document.getElementById('caesar-shift').value);
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
            const code = ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
            result += String.fromCharCode(code);
        } else {
            result += char;
        }
    }

    document.getElementById('caesar-result').textContent = result;
}

// Función para analizar frecuencia
function analyzeFrequency() {
    const text = document.getElementById('caesar-advanced-input').value.toUpperCase();
    const frequency = {};
    let total = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
            frequency[char] = (frequency[char] || 0) + 1;
            total++;
        }
    }

    let result = 'Análisis de frecuencia:\n\n';
    for (let char in frequency) {
        const percentage = ((frequency[char] / total) * 100).toFixed(2);
        result += `${char}: ${frequency[char]} (${percentage}%)\n`;
    }

    document.getElementById('frequency-analysis').textContent = result;
}

// Función para cifrar con Vigenère
function cipherVigenere() {
    const text = document.getElementById('vigenere-input').value.toUpperCase();
    const key = document.getElementById('vigenere-key').value.toUpperCase();
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
            const keyChar = key[i % key.length];
            const shift = keyChar.charCodeAt(0) - 65;
            const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
            result += String.fromCharCode(code);
        } else {
            result += char;
        }
    }

    document.getElementById('vigenere-result').textContent = result;
}

// Función para descifrar con Vigenère
function decipherVigenere() {
    const text = document.getElementById('vigenere-input').value.toUpperCase();
    const key = document.getElementById('vigenere-key').value.toUpperCase();
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
            const keyChar = key[i % key.length];
            const shift = keyChar.charCodeAt(0) - 65;
            const code = ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
            result += String.fromCharCode(code);
        } else {
            result += char;
        }
    }

    document.getElementById('vigenere-result').textContent = result;
}

// Función para analizar Vigenère
function analyzeVigenere() {
    const text = document.getElementById('vigenere-analyze-input').value.toUpperCase();
    let result = 'Análisis de secuencias repetidas:\n\n';

    // Buscar secuencias de 4 letras
    for (let i = 0; i < text.length - 3; i++) {
        const seq = text.slice(i, i + 4);
        if (seq.match(/[A-Z]{4}/)) {
            const nextIndex = text.indexOf(seq, i + 4);
            if (nextIndex !== -1) {
                result += `Secuencia "${seq}" encontrada en posiciones ${i} y ${nextIndex}\n`;
                result += `Distancia: ${nextIndex - i}\n\n`;
            }
        }
    }

    document.getElementById('vigenere-analysis').textContent = result;
}

// Función para generar claves RSA
function generateRSAKeys() {
    const p = parseInt(document.getElementById('rsa-p').value);
    const q = parseInt(document.getElementById('rsa-q').value);
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = 2;
    while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e++;
    }
    const d = modInverse(e, phi);

    document.getElementById('rsa-result').textContent = 
        `Clave pública: (${e}, ${n})\nClave privada: (${d}, ${n})`;
}

// Función para cifrar RSA
function cipherRSA() {
    const message = document.getElementById('rsa-message').value;
    const e = 7; // Valor común para e
    const n = 143; // 11 * 13
    let result = '';

    for (let i = 0; i < message.length; i++) {
        const char = message.charCodeAt(i);
        const encrypted = modPow(char, e, n);
        result += encrypted + ' ';
    }

    document.getElementById('rsa-result').textContent = result.trim();
}

// Función para descifrar RSA
function decipherRSA() {
    const message = document.getElementById('rsa-message').value.split(' ');
    const d = 103; // Valor calculado para d
    const n = 143; // 11 * 13
    let result = '';

    for (let i = 0; i < message.length; i++) {
        const char = parseInt(message[i]);
        const decrypted = modPow(char, d, n);
        result += String.fromCharCode(decrypted);
    }

    document.getElementById('rsa-result').textContent = result;
}

// Función para factorizar RSA
function factorizeRSA() {
    const n = parseInt(document.getElementById('rsa-factor-n').value);
    let result = 'Factores encontrados:\n\n';

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            result += `${n} = ${i} × ${n/i}\n`;
            break;
        }
    }

    document.getElementById('rsa-factorization').textContent = result;
}

// Función para cifrar AES
function cipherAES() {
    const text = document.getElementById('aes-input').value;
    const key = document.getElementById('aes-key').value;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const encrypted = (char ^ keyChar).toString(16).padStart(2, '0');
        result += encrypted;
    }

    document.getElementById('aes-result').textContent = result;
}

// Función para descifrar AES
function decipherAES() {
    const text = document.getElementById('aes-input').value;
    const key = document.getElementById('aes-key').value;
    let result = '';

    for (let i = 0; i < text.length; i += 2) {
        const hex = text.slice(i, i + 2);
        const char = parseInt(hex, 16);
        const keyChar = key.charCodeAt((i/2) % key.length);
        result += String.fromCharCode(char ^ keyChar);
    }

    document.getElementById('aes-result').textContent = result;
}

// Función para generar hash
function generateHash() {
    const text = document.getElementById('hash-input').value;
    let hash = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    document.getElementById('hash-result').textContent = hash.toString(16);
}

// Función para simular BB84
function simulateBB84() {
    const message = "01001000 01101001";
    let result = 'Simulación del protocolo BB84:\n\n';
    result += `Mensaje original: ${message}\n`;
    result += `Bases de Alice: ${generateRandomBases(message.length)}\n`;
    result += `Bases de Bob: ${generateRandomBases(message.length)}\n`;
    result += `Clave compartida: ${message.replace(/ /g, '')}`;

    document.getElementById('quantum-result').textContent = result;
}

// Función para resolver el desafío final
function solveChallenge() {
    const input = document.getElementById('challenge-input').value;
    let result = 'Análisis del desafío:\n\n';
    result += `1. El mensaje parece estar en base64\n`;
    result += `2. Podría estar cifrado con AES\n`;
    result += `3. La clave podría estar en el mensaje\n`;
    result += `4. Intenta descifrar con diferentes técnicas`;

    document.getElementById('challenge-result').textContent = result;
}

// Funciones auxiliares
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if (((a % m) * (x % m)) % m === 1) {
            return x;
        }
    }
    return 1;
}

function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

function generateRandomBases(length) {
    return Array(length).fill(0).map(() => Math.random() < 0.5 ? '+' : '×').join('');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar solo el primer nivel al inicio
    document.querySelectorAll('.exercise-card').forEach((card, index) => {
        if (index === 0) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Agregar event listeners a los botones de nivel
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLevel(btn.dataset.difficulty);
        });
    });
}); 