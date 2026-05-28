<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getMathTask } from '@/utils/math-task';
import { getMorseTask } from '@/utils/morse-task';
import type { ProtectionData } from '@/utils/types';

const protection = defineModel<ProtectionData>({ required: true });

const protectionOptions = [
  { text: 'No Protection', value: 'NO' },
  { text: 'Password', value: 'PASSWORD' },
  { text: 'Math', value: 'MATH' },
  { text: 'Morse', value: 'MORSE' },
  { text: 'Text', value: 'TEXT' },
];

const demoMath = ref('');
const demoMorse = ref('');

watch(
  () => protection.value.mathLevel,
  (val) => {
    if (val) demoMath.value = `${getMathTask(val).problem} = ?`;
  },
  { immediate: true },
);

watch(
  () => protection.value.morseLength,
  (val) => {
    if (val) demoMorse.value = getMorseTask(val).problem;
  },
  { immediate: true },
);
</script>

<template>
  <h3>Protection</h3>
  <select v-model="protection.protectionType">
    <option
      v-for="option in protectionOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>

  <div v-if="protection.protectionType === 'PASSWORD'">
    <label>
      Password
      <input
        type="password"
        placeholder="Password"
        v-model="protection.password"
        id="password"
      />
    </label>
  </div>

  <div v-if="protection.protectionType === 'TEXT'">
    <label>
      Text to type
      <textarea
        v-model="protection.customText"
        rows="3"
        placeholder="Enter text"
      ></textarea>
    </label>
  </div>

  <div v-if="protection.protectionType === 'MATH'">
    <label>
      Math level: {{ protection.mathLevel }} (e.g., {{ demoMath }})
      <input
        type="range"
        min="1"
        max="10"
        v-model.number="protection.mathLevel"
        id="math"
      />
    </label>
  </div>

  <div v-if="protection.protectionType === 'MORSE'">
    <label>
      Number of letters: {{ protection.morseLength }} (e.g.,
      <code>{{ demoMorse }}</code
      >)
      <input
        type="range"
        min="1"
        max="10"
        v-model.number="protection.morseLength"
        id="morse"
      />
    </label>
  </div>
</template>
