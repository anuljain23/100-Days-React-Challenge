import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'
import { categoryOptions } from '../dataStore/data'
import { DataContext } from '../context/dataContext'

const AsideBar = () => {
    const { theme } = useContext(ThemeContext)
    const { selectedCategory, setSelectedCategory } = useContext(DataContext)
    const categories = categoryOptions
    return (
        <aside className={`flex flex-col gap-3 border rounded-2xl shadow-lg p-4 w-full lg:w-1/4 ${theme.card}`}>
            <h2 className='text-2xl font-semibold mb-2'>
                Categories
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3'>
                {categories.map((category) => {
                    return (
                        <button
                            key={category.name}
                            className={`cursor-pointer px-4 py-3 rounded-xl font-medium shadow-md ${category.value === selectedCategory ? theme.categoryActive : theme.categoryDefault}`}
                            onClick={() => (setSelectedCategory(category.value))}
                        >
                            {category.name}
                        </button>
                    )
                })}
            </div>
        </aside>
    )
}

export default AsideBar