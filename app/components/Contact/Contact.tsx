import React from 'react'

const Contact = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-4 md:px-8 md:py-4">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                        Get in touch
                    </h2>
                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                        This is a section of some simple filler text, also known as placeholder
                        text. It shares some characteristics of a real written text but is
                        random or otherwise generated.
                    </p>
                </div>

                <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        ></textarea>
                    </div>
                    <div className="sm:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Contact