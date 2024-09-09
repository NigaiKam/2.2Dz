import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const clickNext = () => {
		setActiveIndex((currentStep) => currentStep + 1);
	};

	const clickBack = () => {
		if (activeIndex > 0) {
			setActiveIndex((currentStep) => currentStep - 1);
		}
	};

	const startOver = () => {
		setActiveIndex(0);
	};
	const firstStep = activeIndex === 0;
	const lastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ title, id }, index) => (
							<li
								key={id}
								className={
									styles['steps-item'] +
									(index === activeIndex ? ` ${styles.active}` : '') +
									(index < activeIndex ? ` ${styles.done}` : '')
								}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={clickBack}
							disabled={firstStep}
						>
							Назад
						</button>
						{!lastStep ? (
							<button className={styles.button} onClick={clickNext}>
								Далее
							</button>
						) : (
							<button className={styles.button} onClick={startOver}>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
