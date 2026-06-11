<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';

  import { useContactStore } from '@/features/contact/contact.store';

  const contactStore = useContactStore();
  const { contactList, pendingContactCount } = storeToRefs(contactStore);
  const { fetchContact } = contactStore;

  onMounted(async () => {
    await fetchContact();
  });
</script>

<template>
  <UContainer class="mb-12 max-w-4xl space-y-6">
    <UPageHeader
      :ui="{
        title: 'flex flex-row gap-6 items-center w-full',
      }"
    >
      <template #title>
        <h2 class="">문의 관리</h2>
        <UBadge class="bg-primary/30 text-primary rounded-full">
          {{ `미처리 ${pendingContactCount}건` }}
        </UBadge>
      </template>
    </UPageHeader>
    <UPageBody class="flex flex-col gap-2">
      <ContactItem v-for="contact in contactList" :key="contact.id" :contact="contact" />
    </UPageBody>
  </UContainer>
</template>
