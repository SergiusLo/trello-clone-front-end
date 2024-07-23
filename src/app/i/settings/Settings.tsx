'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)
	const { mutate, isPending } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w2/4'
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='email'
							label='Email'
							placeholder='Email'
							type='email'
							{...register('email', { required: 'Email is required' })}
							extra='mb-4'
						/>
						<Field
							id='name'
							label='Name'
							placeholder='Name'
							{...register('name')}
							extra='mb-4'
						/>
						<Field
							id='password'
							label='Password'
							placeholder='Password'
							type='password'
							{...register('password')}
							extra='mb-10'
						/>
					</div>
					<div>
						<Field
							id='workInterval'
							label='Work interval (min.)'
							placeholder='Enter work interval (min.)'
							isNumber
							{...register('workInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>
						<Field
							id='breakInterval'
							label='Break interval (min.)'
							placeholder='Enter break interval (min.)'
							isNumber
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>
						<Field
							id='intervalsCount'
							label='Intervals count (max 10):'
							placeholder='Enter intervals count (max 10):'
							isNumber
							{...register('intervalCount', {
								valueAsNumber: true
							})}
							extra='mb-6'
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}
