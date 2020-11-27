import { useCombobox } from "downshift"
import { FC, useState } from "react"
import { Button } from "./Layout/primatives";
const itemToString = (i) => (i ? i.name : '')

export type selectItem = { label: string; id: string }
export type selectItems = selectItem[];
const DropdownCombobox: FC<{ items: selectItems,onSave: (selectedItem:selectItem) => void } > = ({items,onSave}) =>  {
  const [inputItems, setInputItems] = useState<selectItems>([]);
  const [choosenOne, setChoosenOne] = useState<selectItem | null>(null);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(({ label }) => {
          return label.includes(inputValue);
        })
      )
    },
  });
  const setItem = (item) => {
    setInputValue(item.label);
    setChoosenOne(item);
  }
    return (
      <div>
        <label {...getLabelProps()}>Choose A Repo</label>
        <div  {...getComboboxProps()}>
          <input {...getInputProps()} />
          <button
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu"
          >
            &#8595;
          </button>
        </div>
        <ul {...getMenuProps()} >
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                className={'border-rose-200'}
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#bde4ff' }
                    : {}
                }
                key={item.id}
                {...getItemProps({ item, index })}
                onClick={()=>setItem(item)}
              >
                {item.label}
              </li>
            ))}
        </ul>
        <>{choosenOne && <Button onClick={() => onSave(choosenOne)}>Choose</Button>}</>
      </div>
    )
}
  

export default DropdownCombobox;