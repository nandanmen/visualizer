import React, { FocusEventHandler, FormEventHandler } from 'react'

type Args = (readonly [string, unknown])[]

type ArgumentFormProps = {
  args: Args
  onSubmit: (newArgs: Args) => void
}

export default function ArgumentForm({ args, onSubmit }: ArgumentFormProps) {
  const [errors, setErrors] = React.useState({})

  const validate = (name: string, value: string) => {
    if (isSerializable(value)) {
      setErrors({ [name]: null })
      return true
    }
    setErrors({ [name]: 'Please enter a serializable input.' })
    return false
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target
    validate(name, value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault()
    const data = [...new FormData(evt.target as HTMLFormElement).entries()] as [
      string,
      string
    ][]

    if (!data.every(([name, value]) => validate(name, value))) {
      return
    }

    onSubmit(data.map(([name, value]) => [name, JSON.parse(value)]))
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {args.map(([name, value]) => (
        <label key={name} className="block font-mono w-full mb-2">
          {name}
          <input
            name={name}
            className="w-full block border-3 border-black rounded-lg p-2"
            type="text"
            defaultValue={JSON.stringify(value)}
            onBlur={handleBlur}
          />
          {errors[name] && (
            <p className="text-sm text-red-600">{errors[name]}</p>
          )}
        </label>
      ))}
      <button className="bg-gray-300 rounded-lg w-full p-2 font-bold mt-4">
        Update
      </button>
    </form>
  )
}

function isSerializable(value: string) {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}
