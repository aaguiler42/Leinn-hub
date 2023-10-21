import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

interface Props {
  data: [{ value: string, label: string }],
  value: { value: string, label: string },
  setValue: (arg: any) => void,
  id?: string,
  form?: boolean,
  placeholder?: string,
  isMulti?: boolean,
  className?: string,
}

export default function Dropdown ({ data, value, setValue, id, form, placeholder, isMulti, className = '', ...props }: Props) {
  const customStyles = form
    ? {
        control: (base: any, state: any) => ({

          display: 'flex',
          minWidth: '175px',

          border: `1px solid ${state.isFocused ? '#808080' : '#ccc'}`,
          height: '51.59px',
          width: '100%',
          borderRadius: '10px',
          paddingLeft: '10px',

          fontWeight: '600',
          fontSize: ' 15px',
          lineHeight: '24px',
          color: '#92929D',
          ...(isMulti && ({
            display: 'grid',
            gridTemplateColumns: '1fr auto'
          }))
        }),
        indicatorSeparator: () => ({
          display: 'none'
        }),
        ...(isMulti && ({
          valueContainer: () =>
            ({
              flexWrap: 'no-wrap',
              alignItems: 'center',
              overflow: 'auto',
              '> *': {
                minWidth: 'fit-content'
              }
            })
        }
        ))
      }
    : {
        control: () => ({
          display: 'flex',
          minWidth: '175px',
          border: '1px solid #F1F1F5',
          borderRadius: '10px',

          fontWeight: '500',
          fontSize: ' 16px',
          lineHeight: '24px',
          color: '#696974'
        }),
        indicatorSeparator: () => ({
          display: 'none'
        })
      }
  const handleChange = (data: any) => {
    setValue(data)
  }
  return (
    <Select
      closeMenuOnSelect={!isMulti}
      styles={customStyles as any}
      components={animatedComponents}
      value={value}
      onChange={handleChange}
      isMulti={isMulti}
      options={data}
      id={id}
      instanceId={id}
      inputId={id}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  )
}
