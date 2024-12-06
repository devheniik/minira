import {Link, useNavigate} from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {zh} from '@/lib/zod.helper.ts'
import {t} from 'i18next'
import ValidationFormField from '@/components/validation/validation-form-field.tsx'
import ValidationForm from '@/components/validation/validation-form.tsx'
import { useAuth } from '@/context/AuthContext'
import {useMutation} from '@tanstack/react-query'

const loginFormSchema = z.object({
    'email': zh.min(1).max(255),
    'password':zh.min(1).max(9999)
})

type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export function LoginView() {

    const {onLogin} = useAuth()
    const navigate = useNavigate()

    const form = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: async (values: LoginFormSchemaType) => {
            if (onLogin) {
                try {
                    await onLogin(values.email, values.password)

                    navigate('/')
                } finally {
                    console.log('Login failed')
                }
            }
        }
    })


    return (
        <div className={'size-full flex items-center justify-center'}>
            <Card className="max-w-1/3 min-w-[600px]">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {t('Login')}
                    </CardTitle>
                    <CardDescription>
                        {t('Enter your email below to login to your account')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ValidationForm form={form} onSubmit={onSubmit} className="space-y-8">
                        <ValidationFormField
                            control={form.control}
                            name="email"
                            label={t('Login')}
                            render={({ field }) => (
                                <Input  placeholder="example@minira.com" {...field} />
                            )}
                        />

                        <ValidationFormField
                            control={form.control}
                            name="password"
                            label={t('Password')}
                            render={({ field }) => (
                                <Input type="password" placeholder="" {...field} />
                            )}
                        />
                        <div className="w-full flex items-center justify-center">
                            <Button disabled={isPending} type="submit">
                                {t('Submit')}
                            </Button>
                        </div>
                    </ValidationForm>
                    <div className="mt-4 text-center text-sm">
                        {t('Do not have an account?')}{' '}
                        <Link to="/register" className="underline">
                            {t('Sign up')}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
