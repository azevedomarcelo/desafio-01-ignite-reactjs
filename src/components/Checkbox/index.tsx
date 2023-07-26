import trashImg from '../../assets/trash.svg'
import './styles.css';

interface CheckboxProps {
  id: number;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  handleRemoveTask: (id: number) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange, handleRemoveTask }) => {
  return (
    <div className="checkbox-wrapper">
      <input
        id={String(id)}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={String(id)} className={checked ? 'textChecked' : ''}>
        {label}
      </label>
      <span className="checkmark"></span>

      <button className="trashButton" onClick={() => handleRemoveTask(id)}>
        <img src={trashImg} alt="excluir" />
      </button>
    </div>
  );
};