
import type {DocumentHead} from '@builder.io/qwik-city'
import { component$ } from '@builder.io/qwik';
import './footer-section.scss';

export default component$(() => {
  return (
    <footer class="footer" id='contacts'>
      <div class="footer__container container">
        <div class="footer__col footer__contact">
          <h3>Контакты</h3>
          <p class="footer__name">Cravcenco Vladlena</p>
          <p>ИП Cravcenco V. | IDNO: xxxxxxxx | Moldova</p>
          <p>📞 +373 (78) 158084</p>
          <p>📧 godevca@gmail.com</p>
          <div class="footer__socials">
            <a href="#" aria-label="LinkedIn"><i class="icon icon--linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i class="icon icon--instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="icon icon--facebook"></i></a>
            <a href="#" aria-label="Telegram"><i class="icon icon--telegram"></i></a>
          </div>
        </div>

        <div class="footer__col">
          <h4>Документы</h4>
          <ul>
            <li><a href="#">Копией свидетельства ИП</a></li>
            <li><a href="#">Публичная оферта</a></li>
            <li><a href="#">Пример договора</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Информация</h4>
          <ul>
            <li><a href="#">Обо мне</a></li>
            <li><a href="#">Цены</a></li>
            <li><a href="#">Блог</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#">Услуги</a></li>
            <li><a href="#">Процесс</a></li>
            <li><a href="#">Проекты</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© 2025 Cravcenco Vladlena. Все права защищены.</p>
      </div>
    </footer>
  );
});

export const head: DocumentHead = {
    title: 'Обо мне',
    meta: [
        {
            name: 'description',
            content: 'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',

        },
    ],
};