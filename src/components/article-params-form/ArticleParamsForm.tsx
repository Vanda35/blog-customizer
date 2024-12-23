import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useState, useRef, FormEvent } from 'react';
import { useDisclosure } from 'src/hooks/useDisclosure';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
		fontSize: articleState.fontSizeOption,
	});

	const formRef = useRef<HTMLFormElement>(null);

	useDisclosure({ isOpen, onClose: () => setIsOpen(false), formRef: formRef });

	function toogleOpenClose() {
		setIsOpen(!isOpen);
	}

	const clickSubmit = (event: FormEvent) => {
		event.preventDefault();

		setArticleState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSize,
		});

		setIsOpen(false);
	};

	const clickReset = (event: FormEvent) => {
		event.preventDefault();

		setFormState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSize: defaultArticleState.fontSizeOption,
		});

		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toogleOpenClose} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					ref={formRef}
					onSubmit={clickSubmit}
					onReset={clickReset}
					className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(newOption) =>
							setFormState((prevFormState) => ({
								...prevFormState,
								fontFamily: newOption,
							}))
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
						onChange={(newOption) =>
							setFormState((prevFormState) => ({
								...prevFormState,
								fontSize: newOption,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(newOption) =>
							setFormState((prevFormState) => ({
								...prevFormState,
								fontColor: newOption,
							}))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(newOption) =>
							setFormState((prevFormState) => ({
								...prevFormState,
								backgroundColor: newOption,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(newOption) =>
							setFormState((prevFormState) => ({
								...prevFormState,
								contentWidth: newOption,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
