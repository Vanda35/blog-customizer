import { useEffect } from 'react';

type useDisclosureProps = {
	isOpen: boolean;
	onClose: () => void;
	formRef: React.RefObject<HTMLFormElement>;
};
export function useDisclosure({
	isOpen,
	onClose,
	formRef,
}: useDisclosureProps) {
	useEffect(() => {
		if (!isOpen) return;

		function clickOutside(event: MouseEvent) {
			const target = event.target;
			if (
				target instanceof Node &&
				formRef.current &&
				!formRef.current.contains(target)
			) {
				onClose();
			}
		}

		document.addEventListener('mousedown', clickOutside);

		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [isOpen, onClose, formRef]);
}
