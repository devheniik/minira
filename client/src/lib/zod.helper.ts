import * as zod from 'zod'
import { t } from 'i18next'

export abstract class zh {
    private static z = zod

    public static min = (min: number) => {
        return this.z.string().min(min, {
            message: t('validation.min', { min })
        })
    }

    public static max = (max: number) => {
        return this.z.string().max(max, {
            message: t('validation.max', { max })
        })
    }
}