import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiCall from '../../service/ApiCall'

const CustomerForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        heroName: '',
        heroPersonality: '',
        age: 0,
        interests: [] as string[],
        worldSetting: '',
        educationalGoals: '',
    })
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    // Fetch existing data on mount
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const res = await apiCall({
                    apiname: "CUSTOMER_DETAILS_GET",
                    userData: { "user_id": sessionStorage.getItem("user_id") }
                })
                if (res.data.customer_details) {
                    const details = res.data.customer_details
                    setFormData({
                        heroName: details.hero_name || '',
                        heroPersonality: details.hero_personality || '',
                        age: details.age || 0,
                        interests: details.interests ? details.interests.split(',') : [],
                        worldSetting: details.world_setting || '',
                        educationalGoals: details.educational_goals || '',
                    })
                }
            } catch (error) {
                console.log("No existing customer details found.", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCustomerDetails()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        try {
            const payload = {
                hero_name: formData.heroName,
                hero_personality: formData.heroPersonality,
                age: formData.age,
                interests: formData.interests.join(','),
                world_setting: formData.worldSetting,
                educational_goals: formData.educationalGoals
            }
            const res = await apiCall({
                apiname: "CUSTOMER_DETAILS_POST",
                userData: { ...payload, user_id: sessionStorage.getItem("user_id") }
            })
            setMessage(res.data.message || 'Customer details saved successfully!')
            navigate('/videos')
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Something went wrong')
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="w-full m-2 md:max-w-2xl lg:max-w-4xl customer-form container bg-white rounded shadow mx-auto my-8 flex flex-col h-full align-center justify-center p-6 pt-3 border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center">Parent Preference Form</h2>
            {message && <div className="mb-4 text-center text-green-700">{message}</div>}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 w-full h-full">
                {/* Child Details */}
                <div className="child-details flex flex-col mb-4 bg-green-100 p-4 rounded shadow-sm border border-green-200">
                    <h2 className="text-lg font-semibold mb-2 text-center text-green-800">Child's Details</h2>
                    <label htmlFor="age" className="block mb-2 font-bold text-blue-600">What is your child's age?</label>
                    <input
                        type="number"
                        id="age"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.valueAsNumber})}
                        className="w-full p-1 border border-gray-300 rounded"
                    />
                    <label htmlFor="interests" className="block mb-2 font-bold text-blue-600 mt-2">Child's interests (comma separated)</label>
                    <input
                        type="text"
                        id="interests"
                        placeholder='Space, Magic, Nature, Creativity'
                        value={formData.interests.join(', ')}
                        onChange={(e) => setFormData({...formData, interests: e.target.value.split(',').map(i => i.trim())})}
                        className="w-full p-1 border border-gray-300 rounded"
                    />
                </div>

                {/* Hero Details */}
                <div className="hero-details flex flex-col mb-4 bg-red-100 p-4 rounded shadow-sm border border-red-200">
                    <h2 className="text-lg font-semibold mb-2 text-center text-red-800">Hero Details</h2>
                    <label htmlFor="heroName" className="block mb-2 font-bold text-blue-600">Hero's Name</label>
                    <input
                        type="text"
                        id="heroName"
                        value={formData.heroName}
                        onChange={(e) => setFormData({...formData, heroName: e.target.value})}
                        className="w-full p-1 border border-gray-300 rounded"
                    />
                    <label htmlFor="heroPersonality" className="block mb-2 font-bold text-blue-600 mt-2">Hero's Personality</label>
                    <input
                        type="text"
                        id="heroPersonality"
                        value={formData.heroPersonality}
                        onChange={(e) => setFormData({...formData, heroPersonality: e.target.value})}
                        className="w-full p-1 border border-gray-300 rounded"
                    />
                </div>

                {/* World Details */}
                <div className="world-details flex flex-col mb-4 bg-yellow-200 p-4 rounded shadow-sm border border-yellow-400">
                    <h2 className="text-lg font-semibold mb-2 text-center text-yellow-800">World Details</h2>
                    <label htmlFor="worldSetting" className="block mb-2 font-bold text-blue-600">Describe the story's world</label>
                    <input
                        type="text"
                        id="worldSetting"
                        value={formData.worldSetting}
                        onChange={(e) => setFormData({...formData, worldSetting: e.target.value})}
                        className="w-full p-1 border border-gray-300 rounded"
                    />
                </div>

                {/* Educational Goals */}
                <div className="educational-details flex flex-col mb-4 bg-purple-100 p-4 rounded shadow-sm border border-purple-200">
                    <h2 className="text-lg font-semibold mb-2 text-center text-purple-800">Educational Goals</h2>
                    <label htmlFor="educationalGoals" className="block mb-2 font-bold text-blue-600">Educational goals for your child</label>
                    <input
                        type="text"
                        id="educationalGoals"
                        value={formData.educationalGoals}
                        onChange={(e) => setFormData({...formData, educationalGoals: e.target.value})}
                        className="w-full p-1 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex justify-center pt-2 pb-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-1/4"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CustomerForm

