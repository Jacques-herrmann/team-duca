<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  modelValue:  { type: String, default: '' },
  label:       { type: String, default: null },
  name:        { type: String, required: true },
  options:     { type: Array, required: true },
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
    <div class="form-select-wrap">
      <select
        :id="name"
        class="form-select"
        v-bind="$attrs"
        :name="name"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :aria-required="required || undefined"
        :aria-invalid="!!error || undefined"
        :aria-describedby="error ? `${name}-error` : undefined"
        @change="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>
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

.form-select-wrap
  position: relative

  &::after
    content: ''
    position: absolute
    right: 1rem
    top: 50%
    transform: translateY(-50%)
    width: 0
    height: 0
    border-left: 5px solid transparent
    border-right: 5px solid transparent
    border-top: 5px solid rgba($white, 0.5)
    pointer-events: none

.form-select
  @include text(1rem)
  background-color: $black-light
  border: 1px solid rgba($white, 0.12)
  color: $white
  padding: 0.75rem 2.5rem 0.75rem 1rem
  outline: none
  width: 100%
  cursor: pointer
  transition: border-color $transition-fast

  &:focus
    border-color: rgba($white, 0.4)

  &:disabled
    opacity: 0.4
    cursor: not-allowed

  option
    background-color: $black-light
    color: $white

.form-error
  @include caption(0.65rem)
  color: $red
</style>
