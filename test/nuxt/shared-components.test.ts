import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';

import AppAvatar from '@/components/shared/Avatar.vue';
import AppBadge from '@/components/shared/Badge.vue';
import AppCard from '@/components/shared/Card.vue';
import AppCheckbox from '@/components/shared/Checkbox.vue';
import AppIcon from '@/components/shared/Icon.vue';
import AppInput from '@/components/shared/Input.vue';
import AppModal from '@/components/shared/Modal.vue';
import AppSelect from '@/components/shared/Select.vue';
import AppSpinner from '@/components/shared/Spinner.vue';
import AppTextarea from '@/components/shared/Textarea.vue';
import AppToggle from '@/components/shared/Toggle.vue';
import AppTooltip from '@/components/shared/Tooltip.vue';

describe('Shared Components', () => {
  it('renders AppAvatar', async () => {
    const wrapper = await mountSuspended(AppAvatar, { props: { fallback: 'AB' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('A');
  });

  it('renders AppBadge', async () => {
    const wrapper = await mountSuspended(AppBadge, { slots: { default: () => 'New' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('New');
  });

  it('renders AppCard', async () => {
    const wrapper = await mountSuspended(AppCard, { slots: { default: () => 'Content' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Content');
  });

  it('renders AppCheckbox and emits update:modelValue', async () => {
    const wrapper = await mountSuspended(AppCheckbox, {
      props: { label: 'Check me', modelValue: false }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Check me');
    await wrapper.find('input').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('renders AppIcon', async () => {
    const wrapper = await mountSuspended(AppIcon, { props: { name: 'ph:user' } });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders AppInput and emits update:modelValue', async () => {
    const wrapper = await mountSuspended(AppInput, {
      props: { placeholder: 'Type here', modelValue: '' }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').attributes('placeholder')).toBe('Type here');
    await wrapper.find('input').setValue('Hello');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello']);
  });

  it('renders AppModal and handles close events', async () => {
    const wrapper = await mountSuspended(AppModal, {
      props: { modelValue: true, title: 'Modal Title' }
    });
    expect(wrapper.exists()).toBe(true);

    const closeBtn = wrapper.find('.modal__close');
    if (closeBtn.exists()) {
      await closeBtn.trigger('click');
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    }
  });

  it('renders AppSelect and emits update:modelValue', async () => {
    const wrapper = await mountSuspended(AppSelect, {
      props: {
        modelValue: '1',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Option 1');
    await wrapper.find('select').setValue('2');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2']);
  });

  it('renders AppSpinner', async () => {
    const wrapper = await mountSuspended(AppSpinner);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders AppTextarea and emits update:modelValue', async () => {
    const wrapper = await mountSuspended(AppTextarea, {
      props: { placeholder: 'Long text', modelValue: '' }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Long text');
    await wrapper.find('textarea').setValue('Some content');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Some content']);
  });

  it('renders AppToggle and emits update:modelValue', async () => {
    const wrapper = await mountSuspended(AppToggle, {
      props: { label: 'Switch me', modelValue: false }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Switch me');

    // Toggle label wrapper click or input directly
    const input = wrapper.find('input[type="checkbox"]');
    if (input.exists()) {
      await input.setValue(true);
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    }
  });

  it('renders AppTooltip', async () => {
    const wrapper = await mountSuspended(AppTooltip, { props: { text: 'Tooltip info' } });
    expect(wrapper.exists()).toBe(true);
  });
});
