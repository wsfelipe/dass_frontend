<template>
  <header class="header">
    <div class="container header__inner">
      <a
        href="https://grupodass.com"
        target="_blank"
        rel="noopener"
        aria-label="Grupo Dass"
      >
        <img src="@/assets/dass_logo.png" alt="Grupo Dass" class="header__logo" />
      </a>
      <span class="header__tag">Brindes de fim de ano</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-ink);
  color: #fff;
  border-bottom: 3px solid var(--color-accent);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
}
.header__logo {
  height: 36px;
  display: block;
  filter: brightness(0) invert(1);
}
.header__tag {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.85;
}
</style>
