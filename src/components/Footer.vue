<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  interface NavItem {
    label?: string;
    url: string;
    icon?: string;
  }

  const { t } = useI18n();

  const navItems: NavItem[] = [
    {
      label: 'About',
      url: '#about',
      icon: 'i-lucide-info',
    },
    {
      label: 'Team',
      url: '#team',
      icon: 'i-lucide-users',
    },
    {
      label: 'Contact',
      url: '#contact',
      icon: 'i-lucide-mail',
    },
  ];

  const resourceItems: NavItem[] = [
    {
      label: t('footer.resources.source'),
      url: 'https://github.com/croffle-dev/main-page',
      icon: 'i-lucide-code-2',
    },
    {
      label: t('footer.resources.blog'),
      url: '#',
      icon: 'i-lucide-book-open',
    },
  ];

  const followItems: NavItem[] = [
    {
      label: 'GitHub',
      url: 'https://github.com/croffle-dev',
      icon: 'i-lucide-github',
    },
  ];
</script>

<template>
  <footer class="border-border bg-muted/30 border-t">
    <div class="container mx-auto px-6 py-12">
      <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div class="mb-4 flex items-center gap-2">
            <div
              class="bg-primary flex h-8 w-8 items-center justify-center rounded-lg"
              aria-hidden="true"
            >
              <img src="../assets/logo-only-x32.svg" alt="" role="presentation" />
            </div>
            <span class="text-xl font-bold">Croffle Dev</span>
          </div>
          <p class="text-muted-foreground">Code-baked Sweet Innovation</p>
        </div>

        <div>
          <h3 class="mb-4 font-bold">Quick Links</h3>
          <ul class="space-y-2" aria-label="Quick Links">
            <li v-for="(item, index) in navItems" :key="index">
              <a
                :href="item.url"
                class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
              >
                <UIcon :name="item.icon" class="h-4 w-4" aria-hidden="true" />
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-bold">Resources</h3>
          <ul class="space-y-2" aria-label="Resources">
            <li v-for="(item, index) in resourceItems" :key="index">
              <a
                :href="item.url"
                class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
              >
                <UIcon :name="item.icon" class="h-4 w-4" aria-hidden="true" />
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-bold">Follow Us</h3>
          <div class="flex gap-3">
            <a
              v-for="(item, index) in followItems"
              :key="index"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-muted hover:bg-accent rounded-lg p-2 transition-colors"
              :aria-label="item.label"
            >
              <UIcon :name="item.icon" class="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-border text-muted-foreground border-t pt-8 text-center">
        <p>{{ `© ${new Date().getFullYear()} Croffle Dev. All rights reserved.` }}</p>
      </div>
    </div>
  </footer>
</template>
