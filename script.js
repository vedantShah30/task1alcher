$(document).ready(function () {
    // Sidebar toggle
    $('.toggle-btn').click(function () {
        $('.sidebar').toggleClass('open');
    });

    // Dropdown
    $('.has-dropdown').click(function () {
        $(this).find('.dropdown').slideToggle();
        $(this).find('.arrow').toggleClass('up');
    });

    // Fetch and display users
    axios.get('https://dummyjson.com/users')
        .then(response => {
            let users = response.data.users;
            users = users.sort(() => 0.5 - Math.random()).slice(0, 10);  // Get 10 random users

            let tableContent = '';
            users.forEach(user => {
                tableContent += `
                    <tr data-id="${user.id}">
                        <td>${user.firstName} ${user.lastName}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="submit-btn" style="display: none;">Submit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `;
            });

            $('.user-table tbody').html(tableContent);

            // Edit functionality
            $('.edit-btn').click(function () {
                let row = $(this).closest('tr');
                row.find('td').each(function () {
                    let text = $(this).text();
                    $(this).html(`<input type="text" value="${text}">`);
                });
                row.find('.edit-btn').hide();
                row.find('.submit-btn').show();
            });

            // Submit functionality
            $('.submit-btn').click(function () {
                let row = $(this).closest('tr');
                row.find('td').each(function () {
                    let input = $(this).find('input').val();
                    $(this).html(input);
                });
                row.find('.submit-btn').hide();
                row.find('.edit-btn').show();
            });

            // Delete functionality
            $('.delete-btn').click(function () {
                $(this).closest('tr').remove();
            });
        });
});
