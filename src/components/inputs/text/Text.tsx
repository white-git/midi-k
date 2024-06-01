import { FormEventHandler } from 'react';

type InputTextProps = {
  label?: string;
  name: string;
  placeholder: string;
  classes?: string[];
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onInput?: { (p: string): void };
};

export function InputText({
  label,
  name,
  value,
  defaultValue,
  disabled,
  placeholder,
  onInput,
  classes = [],
}: InputTextProps) {
  const styles = ['input', disabled ? 'input_disabled' : ''].concat(classes).join(' ');

  const input: FormEventHandler = (e) => {
    const { value } = (e.target as HTMLInputElement);
    if (onInput) onInput(value);
  };

  return (
    <div className={styles}>
      {label && (<label htmlFor="input">{label}</label>)}
      <input
        name={name}
        id={name}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onInput={input}
      />
    </div>
  );
}
