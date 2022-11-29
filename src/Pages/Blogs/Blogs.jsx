import React from 'react';
import useScrollToTop from '../../Hooks/useScrollToTop';
import useTitle from '../../Hooks/useTitle';

const Blogs = () => {
    useScrollToTop();
    useTitle("Dream Car", 'Blogs')
    const blogItems = [
        {
            id: 1,
            question: "What are the different ways to manage a state in a React application?",
            answer: "When we talk about state in our applications, it’s important to be clear about what types of state actually matter.There are four main types of state you need to properly manage in your React appssLocal state,Global state,Server state,URL state"
        }, {
            id: 2,
            question: "How does prototypical inheritance work?",
            answer: "The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object."
        }, {
            id: 3,
            question: "What is a unit test? Why should we write unit tests?",
            answer: "The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages."
        },
        {
            id: 4,
            question: "React vs. Angular vs. Vue?",
            answer: "Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option."
        }
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-3 md:px-0 my-3 md:my-12'>
            {blogItems.map(item => <div
                className='bg-base-100 shadow-2xl dark:bg-blue-300 rounded-lg p-8'
                key={item.id}>
                <h2 className="text-2xl font-semibold mb-4">Question: {item.question}</h2>
                <p><span className='font-semibold'>Answer: {item.answer}</span></p>
            </div>)}
        </div>
    );
};

export default Blogs;