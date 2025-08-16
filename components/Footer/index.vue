<template>
  <footer class="footer">
    <div class="footer__row">
      <div class="footer__logo">
        Logo
      </div>

      <div class="footer__column">
        <div class="font-semibold mb-2 text-lg">Страницы</div>

        <ul class="footer__list">
          <li>
            <ULink to="/cars">Автопарк</ULink>
          </li>

          <li>
            <ULink to="/cars">Реферальная программа</ULink>
          </li>

          <li>
            <ULink to="/cars">Условия</ULink>
          </li>

          <li>
            <ULink to="/cars">О нас</ULink>
          </li>
        </ul>
      </div>

      <div class="footer__column">
        <div class="font-semibold text-lg mb-2">Контакты</div>

        <ul class="footer__list space-y-2">
          <li>
            <div class="font-semibold">Нижний Новгород</div>
            <div class="flex items-center gap-2">
              <UIcon name="ic:baseline-local-phone" class="size-4" />
              <ULink to="/cars">8 (960) 177-22-33</ULink>
            </div>
          </li>

          <li>
            <div class="font-semibold">Владимир</div>
            <div class="flex items-center gap-2">
              <UIcon name="ic:baseline-local-phone" class="size-4" />
              <ULink to="/cars">8 (960) 177-22-44</ULink>
            </div>
          </li>

          <li>
            <div class="font-semibold">Санкт-Петербург</div>
            <div class="flex items-center gap-2">
              <UIcon name="ic:baseline-local-phone" class="size-4" />
              <ULink to="/cars">8 (960) 177-22-22</ULink>
            </div>
          </li>

          <li class="flex items-center gap-2">
            <UIcon name="ic:baseline-alternate-email" class="size-4" />
            <ULink>andre@b-mobile.ru</ULink>
          </li>
        </ul>
      </div>

      <div class="footer__column">
        <div class="font-semibold text-lg mb-2">Соц. сети</div>

        <ul class="footer__list space-y-2">
          <li class="flex items-center gap-2">
            <UIcon name="uil:telegram" class="size-6" />
            <ULink to="/cars">Telegram</ULink>
          </li>

          <li class="flex items-center gap-2">
            <UIcon name="uil:vk" class="size-6" />
            <ULink to="/cars">Вконтакте</ULink>
          </li>

          <li class="flex items-center gap-2">
            <UIcon name="uil:instagram" class="size-6" />
            <ULink to="/cars">Instagram*</ULink>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__row flex text-xs justify-between mt-8">
      <div class="text-muted">
        @b-mobile 2021
      </div>

      <div class="flex gap-2">
        <ULink>Договор присоединения к условиям аренды</ULink>
        <ULink>Политика конфиденциальности</ULink>
        <ULink>Условия обработки персональных данных</ULink>
      </div>
    </div>

    <div class="meta-legal mt-4">
      *Является продуктом компании экстремистской компании Meta, деятельность которой запрещена на территории РФ
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.footer {
  background-color: var(--light-gray);
  padding: 48px;
  border-radius: 16px;

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    font-weight: 600;
  }

  .meta-legal {
    font-size: 8px;
    opacity: 0.6;
  }
}
</style>
