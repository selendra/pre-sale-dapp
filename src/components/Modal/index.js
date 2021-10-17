import { ModalStyled } from "./styles";

export default function ModalComponent({
  children,
  visible,
  onCancel,
  title,
  width,
  center
}) {
  return (
    <ModalStyled
      visible={visible}
      onCancel={onCancel}
      title={title}
      footer=''
      width={width}
      centered={center}
    >
      {children}
    </ModalStyled>
  )
}