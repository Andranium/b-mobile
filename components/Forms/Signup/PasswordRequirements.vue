<template>
  <div class="flex flex-col gap-2">
    <UProgress
      :color="color"
      :indicator="text"
      :model-value="score"
      :max="5"
      size="sm"
    />

    <p id="password-strength" class="text-sm font-medium">
      {{ text }}. Должен содержать:
    </p>

    <ul class="flex flex-col gap-2" aria-label="Требования к паролю">
      <li
        v-for="(req, index) in strength"
        :key="index"
        class="flex items-center gap-1"
        :class="req.met ? 'text-success' : 'text-muted'"
      >
        <UIcon
          :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
          class="size-4 shrink-0"
        />

        <span class="text-xs">
          {{ req.text }}
          <span class="sr-only">
            {{
              req.met ? ' - Требование выполнено' : ' - Требование не выполнено'
            }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { password } = defineProps<{ password: string }>();

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'Не менее 8 символов' },
    { regex: /\W/, text: 'Хотя бы 1 специальный символ (!?.~)' },
    { regex: /(?=.*[a-z])/, text: 'Хотя бы 1 строчную букву' },
    { regex: /(?=.*[A-Z])/, text: 'Хотя бы 1 заглавную букву' },
    { regex: /(?=.*\d)/, text: 'Хотя бы одна цифра (0–9)' },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

const strength = computed(() => checkStrength(password));
const score = computed(() => strength.value.filter((req) => req.met).length);

const color = computed(() => {
  if (score.value === 0) return 'neutral';
  if (score.value <= 1) return 'error';
  if (score.value <= 2) return 'warning';
  if (score.value === 4) return 'warning';
  return 'success';
});

const text = computed(() => {
  if (score.value === 0) return 'Введите пароль';
  if (score.value <= 4) return 'Слабый пароль';
  return 'Надежный пароль';
});
</script>

<style scoped lang="scss"></style>
