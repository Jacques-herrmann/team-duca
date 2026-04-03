<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue:  { type: String, default: '' },
  label:       { type: String, default: null },
  name:        { type: String, required: true },
  type:        { type: String, default: 'text' },
  placeholder: { type: String, default: null },
  required:    { type: Boolean, default: false },
  disabled:    { type: Boolean, default: false },
  error:       { type: String, default: null },
})

defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <div class="form-group">
    <label v-if="label" :for="name" class="form-label">
      {{ label }}<span v-if="required" class="form-label__required" aria-hidden="true"> *</span>
    </label>
    <input
      :id="name"
      class="form-input"
      v-bind="$attrs"
      :name="name"
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-required="required || undefined"
      :aria-invalid="!!error || undefined"
      :aria-describedby="error ? `${name}-error` : undefined"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
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

.form-input
  @include text(1rem)
  background-color: $black-light
  border: 1px solid rgba($white, 0.12)
  color: $white
  padding: 0.75rem 1rem
  outline: none
  width: 100%
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
