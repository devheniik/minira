import {FC, useEffect, useState} from 'react'

interface IconProps {
    name: string;
    className?: string;
    size?: number;
}

// Cache for loaded icons
const iconCache = new Map<string, string>()

export const Icon: FC<IconProps> = ({ name, className = '', size = 24 }) => {
    const [iconContent, setIconContent] = useState<string>('')

    useEffect(() => {
        const importIcon = async () => {
            if (iconCache.has(name)) {
                return iconCache.get(name)
            }

            try {
                const icon = await import(`../../assets/svg/${name}.svg`)
                iconCache.set(name, icon.default)
                return icon.default
            } catch (err) {
                console.log(err)
                console.error(`Icon ${name} not found`)
                return null
            }
        }

        importIcon().then(content => {
            if (content) setIconContent(content)
        })
    }, [name])

    return (
        <img
            className={`icon ${className}`}
            src={iconContent}
            style={{ width: size, height: size }}
        />
    )
}

