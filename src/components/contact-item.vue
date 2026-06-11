<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { useContactStore } from '@/features/contact/contact.store';
  import {
    ContactStatusLabels,
    type Contact,
    type ContactStatus,
    type ContactStatusUpdateRequest,
  } from '@/features/contact/contact.type';

  interface ContactModalProps {
    contact: Contact;
  }

  const props = defineProps<ContactModalProps>();

  const { updateStatus } = useContactStore();

  const contact = computed(() => props.contact);
  const showModal = ref<boolean>(false);
  const tempStatus = ref<ContactStatus>(contact.value.status);
  const statusChanged = computed<boolean>(() => tempStatus.value !== contact.value.status);

  function timeAgo(dateString: string) {
    const date = new Date(dateString);

    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  }

  function getStatusLabel(status: ContactStatus) {
    return ContactStatusLabels.find((s) => s.value === status)?.label ?? status;
  }

  function getStatusColor(status: ContactStatus) {
    switch (status) {
      case 'pending':
        return 'bg-orange-400/10 text-orange-400';
      case 'in_progress':
        return 'bg-amber-400/10 text-amber-400';
      case 'resolved':
        return 'bg-green-400/10 text-green-400';
      case 'on_hold':
        return 'bg-blue-400/10 text-blue-400';
      case 'rejected':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-gray-400/10 text-gray-400';
    }
  }

  async function handleSubmit() {
    if (tempStatus.value === contact.value.status) {
      return;
    }

    const payload: ContactStatusUpdateRequest = {
      id: contact.value.id,
      status: tempStatus.value,
    };
    await updateStatus(payload);
    showModal.value = false;
  }
</script>

<template>
  <UCard>
    <template #default>
      <div class="hidden">
        <div class="bg-orange-400"></div>
        <div class="bg-amber-400"></div>
        <div class="bg-green-400"></div>
        <div class="bg-blue-400"></div>
        <div class="bg-red-400"></div>
      </div>
      <div class="flex w-full flex-row items-center justify-between">
        <div class="flex flex-col gap-1">
          <div class="flex flex-row items-center gap-2">
            <UBadge class="rounded-full" :class="getStatusColor(contact.status)">
              <UIcon name="i-lucide-clock" />
              {{ getStatusLabel(contact.status) }}
            </UBadge>
            <h2 class="">{{ '문의 관리' }}</h2>
          </div>
          <p class="text-muted-foreground text-sm">
            {{ `${contact.name} · ${contact.email} · ${timeAgo(contact.created_at)}` }}
          </p>
        </div>
        <UModal
          v-model="showModal"
          :ui="{
            body: 'min-h-80 max-h-120 py-2 sm:py-2',
          }"
        >
          <UButton variant="outline" class="cursor-pointer px-6 py-2">{{ '보기' }}</UButton>
          <template #title>
            <div class="flex flex-row items-center gap-4">
              <h3 class="text-2xl">{{ '문의 처리' }}</h3>
              <USelect
                v-model="tempStatus"
                :items="ContactStatusLabels"
                :class="getStatusColor(tempStatus)"
              >
                {{ getStatusLabel(tempStatus) }}
              </USelect>
              <UButton v-if="statusChanged" variant="outline" @click="handleSubmit">
                {{ '저장' }}
              </UButton>
            </div>
          </template>
          <template #body>
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-2 border-b border-gray-200 pb-4">
                <h3 class="text-foreground text-xl font-bold">{{ contact.title }}</h3>
                <p class="text-muted-foreground text-sm">
                  {{ `${contact.name} · ${contact.email} · ${timeAgo(contact.created_at)}` }}
                </p>
              </div>
              <p class="text-foreground text-sm wrap-break-word">
                {{ contact.content }}
              </p>
            </div>
          </template>
        </UModal>
      </div>
    </template>
  </UCard>
</template>
