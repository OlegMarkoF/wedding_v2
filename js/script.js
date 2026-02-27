const BOT_TOKEN = '8381550218:AAEs2RgcZxOXAKAJva2PHzeC-ahnk-yD2cs';
const CHAT_ID = '1065319787';


document.addEventListener('DOMContentLoaded', function () {
  const observer = new MutationObserver(() => {
    const form = document.querySelector('#form899457406');
    const button = document.querySelector('button');
    const inputs = document.querySelectorAll('.t-input-title');

    for (let i = 0; i < 4; i++) {
      if (
        inputs[i].textContent ===
        'Будете ли Вы присутствовать на втором дне свадьбы?'
      ) {
        inputs[i].textContent = 'Нужен ли Вам трансфер?';
      }
    }

    if (button && !button.dataset.telegramAttached) {
      button.dataset.telegramAttached = 'true';

      button.addEventListener('click', async function (e) {
        e.preventDefault();

        const drinks =
          document.querySelector('.t-checkboxes__hiddeninput').value || undefined;

        const check = document.querySelectorAll('.t-radio');

        const name = document.querySelector('#nm-1741963235995').value.trim();

        let attendance;
        let secondDay;

        for (let i = 0; i < 4; i++) {
          if (check[i].checked === true && check[i].value === 'Да') {
            // console.log(`${check[i].ariaLabel} Да`);
            if (
              check[i].ariaLabel ===
              'Сможете ли Вы присутствовать на торжестве?'
            ) {
              attendance = `Да`;
            } else if (
              check[i].ariaLabel ===
              'Будете ли Вы присутствовать на втором дне свадьбы?'
            ) {
              secondDay = `Да`;
            }
          } else if (check[i].checked === true && check[i].value === 'Нет') {
            // console.log(`${check[i].ariaLabel} Нет`);
            if (
              check[i].ariaLabel ===
              'Сможете ли Вы присутствовать на торжестве?'
            ) {
              attendance = `Нет`;
            } else if (
              check[i].ariaLabel ===
              'Будете ли Вы присутствовать на втором дне свадьбы?'
            ) {
              secondDay = `Нет`;
            }
          }
        }

        const data = {};

        for (let [key, val] of Object.entries(data)) {
          if (Array.isArray(val)) {
            val = val.join(', ');
          }
          if (val && val.trim()) {
            message += `• <b>${key}:</b> ${val}\n`;
          }
        }

        let arr = drinks.trim().split(';');

        const message = `
📝 Новая анкета от гостя!

👤 Имя: ${name}
✅ Присутствие: ${attendance}
🚌 Трансфер: ${secondDay}
🍷 Напитки: ${arr.join(' , ')}

${new Date().toLocaleString('ru-RU')}`.trim();

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: message,
              parse_mode: 'HTML',
            }),
          });

          if (response.ok) {
            alert(
              `Анкета отправлена!
Спасибо, что подтвердили участие ❤️
Мы вас ждём!`,
            );
            form.reset();
          } else {
            alert(
              `Что-то пошло не так 😢`,
            );
          }
        } catch (err) {
          return;
        }
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
