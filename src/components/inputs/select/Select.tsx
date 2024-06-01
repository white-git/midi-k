import { useEffect, useRef } from 'react';
import { FormEventHandler } from "react";

type InputSelectProps = {
  label: string;
  name: string;
  options: { text: string | number, value: string | number }[];
  value?: string | number;
  classes?: string[];
  disabled?: boolean;
  onChange?: { (p: string | number): void };
};

export function InputSelect({
  label,
  name,
  options,
  value,
  classes = [],
  disabled,
  onChange,
}: InputSelectProps) {
  const select = useRef<HTMLSelectElement>(null);
  const style = ['input', disabled ? 'input_disabled' : ''].concat(classes).join(' ');

  const changed: FormEventHandler = (e) => {
    const { value } = (e.target as HTMLSelectElement);
    if (onChange) onChange(value);
  };

  useEffect(() => {
    if (select.current && value) {
      select.current.value = value.toString();
    }
  }, []);

  return (
    <div className={style}>
      <label htmlFor="input">{label}</label>
      <div className="input-select">
        <select ref={select} name={name} id={name} disabled={disabled} onChange={changed}>
          {options.map(o => (
            <option value={o.value} key={o.value}>{o.text}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
