<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: string
  label?: string
  name: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <div class="form-group">
    <label v-if="label" :for="name" class="form-label">
      {{ label }}<span v-if="required" class="form-label__required" aria-hidden="true"> *</span>
    </label>
    <textarea
      :id="name"
      class="form-textarea"
      v-bind="$attrs"
      :name="name"
      :rows="rows ?? 4"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-required="required || undefined"
      :aria-invalid="!!error || undefined"
      :aria-describedby="error ? `${name}-error` : undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur', $event)"
    >{{ modelValue }}</textarea>
    <span v-if="error" :id="`${name}-error`" class="form-error" role="alert">{{ error }}</span>
  </div>
</template>

<style scoped lang="sass">
.form-group
  display: flex
  flex-direction: column
  gap: 0.5rem

.form-label
  @include caption(0.7rem)
  color: rgba($white, 0.55)

  &__required
    color: $red

.form-textarea
  @include text(1rem)
  background-color: $black-light
  border: 1px solid rgba($white, 0.12)
  color: $white
  padding: 0.75rem 1rem
  outline: none
  width: 100%
  resize: vertical
  min-height: 120px
  font-family: inherit
  transition: border-color $transition-fast

  &::placeholder
    color: rgba($white, 0.25)

  &:focus
    border-color: rgba($white, 0.4)

  &:disabled
    opacity: 0.4
    cursor: not-allowed

.form-error
  @include caption(0.65rem)
  color: $red
</style>
