import cl from './MyModal.module.css';

export interface MyModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function MyModal({ children, visible, setVisible }: MyModalProps) {
  const rootClasses = [cl.myModal];
  if (visible) {
    rootClasses.push(cl.active);
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
