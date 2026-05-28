<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { getMathTask } from '@/utils/math-task';
import { getMorseTask } from '@/utils/morse-task';
import type { ProtectionData } from '@/utils/types';

const props = defineProps<{
  protection: ProtectionData;
}>();

const emit = defineEmits(['unlocked']);

const challengeInput = ref('');
const challengeError = ref(false);
const mathProblem = ref('');
const mathAnswer = ref(0);
const morseProblem = ref('');
const morseAnswer = ref('');

const isUnlockDisabled = computed(() => {
  if (!challengeInput.value) return true;
  if (props.protection.protectionType === 'TEXT') {
    return challengeInput.value !== props.protection.customText;
  }
  return false;
});

const generateChallenge = () => {
  if (props.protection.protectionType === 'MATH') {
    const task = getMathTask(props.protection.mathLevel);
    mathProblem.value = task.problem;
    mathAnswer.value = task.answer;
  } else if (props.protection.protectionType === 'MORSE') {
    const task = getMorseTask(props.protection.morseLength);
    morseAnswer.value = task.answer;
    morseProblem.value = task.problem;
  }
};

const handleTextInput = () => {
  challengeError.value = false;
  if (
    props.protection.customText &&
    !props.protection.customText.startsWith(challengeInput.value)
  ) {
    challengeInput.value = '';
    challengeError.value = true;
  }
};

const verifyChallenge = () => {
  let passed = false;
  if (props.protection.protectionType === 'PASSWORD') {
    if (challengeInput.value === props.protection.password) passed = true;
  } else if (props.protection.protectionType === 'MATH') {
    if (parseInt(challengeInput.value) === mathAnswer.value) passed = true;
  } else if (props.protection.protectionType === 'MORSE') {
    if (challengeInput.value.toLowerCase() === morseAnswer.value) passed = true;
  } else if (props.protection.protectionType === 'TEXT') {
    if (challengeInput.value === props.protection.customText) passed = true;
  }

  if (passed) {
    challengeError.value = false;
    challengeInput.value = '';
    emit('unlocked');
  } else {
    challengeError.value = true;
  }
};

onMounted(() => {
  generateChallenge();
});
</script>

<template>
  <form @submit.prevent="verifyChallenge">
    <label v-if="protection.protectionType === 'PASSWORD'">
      Enter Password
      <input
        type="password"
        placeholder="Password"
        v-model="challengeInput"
        :aria-invalid="challengeError ? 'true' : undefined"
        @input="challengeError = false"
      />
    </label>

    <label v-if="protection.protectionType === 'MATH'">
      Solve: {{ mathProblem }} = ?
      <input
        type="number"
        v-model="challengeInput"
        :aria-invalid="challengeError ? 'true' : undefined"
        @input="challengeError = false"
      />
    </label>

    <label v-if="protection.protectionType === 'MORSE'">
      Decrypt: <code>{{ morseProblem }}</code>
      <input
        type="text"
        v-model="challengeInput"
        :aria-invalid="challengeError ? 'true' : undefined"
        @input="challengeError = false"
      />
    </label>

    <label v-if="protection.protectionType === 'TEXT'">
      Type exactly without errors:
      <blockquote style="font-style: italic; opacity: 0.8; margin: 0.5rem 0">
        {{ protection.customText }}
      </blockquote>
      <input
        type="text"
        v-model="challengeInput"
        :aria-invalid="challengeError ? 'true' : undefined"
        @input="handleTextInput"
        @paste.prevent
        autocomplete="off"
      />
    </label>

    <button type="submit" :disabled="isUnlockDisabled">Unlock</button>
  </form>
</template>
