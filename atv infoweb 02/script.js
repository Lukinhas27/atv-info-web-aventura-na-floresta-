const story = {
    start: {
        text: "Você acorda do nada em uma floresta escura. O que você faz?",
        options: [
            { text: "Explorar a floresta", next: "explore_forest" },
            { text: "Voltar a dormir", next: "sleep" }
        ]
    },
    explore_forest: {
        text: "Você encontra um caminho. Você quer seguir o caminho ou voltar?",
        options: [
            { text: "Seguir o caminho", next: "follow_path" },
            { text: "Voltar", next: "start" }
        ]
    },
    follow_path: {
        text: "O caminho leva a uma caverna. O que você faz?",
        options: [
            { text: "Entrar na caverna", next: "enter_cave" },
            { text: "Sair da caverna", next: "start" },
            { text: "Explorar a floresta mais a fundo", next: "deeper_forest" }
        ]
    },
    enter_cave: {
        text: "Dentro da caverna, você encontra um tesouro! E é isso, você venceu! (agr volte e escolha o outro caminho por gentileza)",
        options: [
            { text: "Voltar ao início", next: "start" }
        ]
    },
    sleep: {
        text: "Você volta a dormir seu soninho e sonha com os anjinhos.",
        options: [
            { text: "Voltar ao início", next: "start" }
        ]
    },
    deeper_forest: {
        text: "Você se aprofunda na floresta e encontra uma aldeia misteriosa. O que você faz?",
        options: [
            { text: "Entrar na aldeia", next: "enter_village" },
            { text: "Voltar para a trilha", next: "follow_path" },
            { text: "Acampar na floresta", next: "camp_in_forest" } 
        ]
    },
    enter_village: {
        text: "Na aldeia, você é recebido por um grupo de indígenas amigáveis. Você quer ajudá-los ou sair?",
        options: [
            { text: "Ajudar a aldeia", next: "help_village" },
            { text: "Sair da aldeia", next: "start" }
        ]
    },
    help_village: {
        text: "Você ajuda a aldeia a resolver seus problemas e se torna um herói local! Você venceu!",
        options: [
            { text: "Voltar ao início", next: "start" }
        ]
    },
    camp_in_forest: {
        text: "Você arma um acampamento e passa a noite na floresta. Durante a noite, você ouve sons estranhos.",
        options: [
            { text: "Investigar os sons", next: "investigate_sounds" },
            { text: "Ignorar e dormir", next: "sleep" }
        ]
    },
    investigate_sounds: {
        text: "Você se aproxima dos sons e encontra um grupo de criaturas pequenas e estranhas. O que você faz?",
        options: [
            { text: "Conversar com as criaturas", next: "talk_to_creatures" },
            { text: "Fugir", next: "start" }
        ]
    },
    talk_to_creatures: {
        text: "As criaturas são amigáveis e oferecem ajuda. Você se torna amigo delas e ganha barras de ouro! Você venceu!",
        options: [
            { text: "Voltar ao início", next: "start" }
        ]
    },
};

function renderStory(step) {
    const container = document.getElementById('story-container');
    container.innerHTML = '';

    const storyText = document.createElement('p');
    storyText.innerText = story[step].text;
    container.appendChild(storyText);

    story[step].options.forEach(option => {
        const optionLink = document.createElement('a');
        optionLink.innerText = option.text;
        optionLink.onclick = () => navigateTo(option.next);
        container.appendChild(optionLink);
        container.appendChild(document.createElement('br'));
    });

    localStorage.setItem('lastStep', step);
}

function navigateTo(step) {
    const params = new URLSearchParams(window.location.search);
    params.set('step', step);
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    renderStory(step);
}

function loadStory() {
    const params = new URLSearchParams(window.location.search);
    const step = params.get('step') || localStorage.getItem('lastStep') || 'start';
    renderStory(step);
}

window.onload = loadStory;