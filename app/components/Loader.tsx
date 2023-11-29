type Props = {
  className?: string,
}

export function Loader({ className = '' }: Props) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
      <path fill="currentColor"
        d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V96c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm0 384c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7 14.3 32 32 32s32-14.3 32-32V416zM0 256c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zm416-32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H416zM75 75c-12.5 12.5-12.5 32.8 0 45.3l45.3 45.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L120.2 75C107.7 62.5 87.5 62.5 75 75zM391.8 346.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L391.8 437c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-45.3-45.3zM75 437c12.5 12.5 32.8 12.5 45.3 0l45.3-45.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L75 391.8c-12.5 12.5-12.5 32.8 0 45.3zM346.5 120.2c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L437 120.2c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-45.3 45.3z" />
    </svg>

  )
}
