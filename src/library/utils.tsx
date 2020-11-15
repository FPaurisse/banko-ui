import * as React from 'react';

const useKeyboardEvent = (key: string, callback: () => void): void => {
    React.useEffect(() => {
        const handler = (event: React.KeyboardEvent): void => {
            if (event.key === key) {
                callback()
            }
        }
        window.addEventListener('keydown', handler as never)
        return () => {
            window.removeEventListener('keydown', handler as never)
        }
    }, [])
}

export { useKeyboardEvent };
